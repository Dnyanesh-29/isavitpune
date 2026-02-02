"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function GPUParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!canvasRef.current || shouldReduceMotion) return

    let animationFrameId: number
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let gpuCompute: any
    let particles: THREE.Points
    let varPos: any
    let varVel: any
    let previousFrame = Date.now() / 1000

    const initScene = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      class GPUComputationRenderer {
        private renderer: THREE.WebGLRenderer
        private width: number
        private height: number
        private variables: any[] = []
        private currentTextureIndex = 0
        private scene: THREE.Scene
        private camera: THREE.OrthographicCamera
        private passThruUniforms: any
        private passThruShader: THREE.ShaderMaterial

        constructor(width: number, height: number, renderer: THREE.WebGLRenderer) {
          this.width = width
          this.height = height
          this.renderer = renderer
          this.scene = new THREE.Scene()
          this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

          this.passThruUniforms = {
            passThruTexture: { value: null },
          }

          this.passThruShader = new THREE.ShaderMaterial({
            uniforms: this.passThruUniforms,
            vertexShader: `
              void main() {
                gl_Position = vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform sampler2D passThruTexture;
              void main() {
                vec2 uv = gl_FragCoord.xy / vec2(${width}.0, ${height}.0);
                gl_FragColor = texture2D(passThruTexture, uv);
              }
            `,
          })
        }

        createTexture() {
          const data = new Float32Array(this.width * this.height * 4)
          const texture = new THREE.DataTexture(data, this.width, this.height, THREE.RGBAFormat, THREE.FloatType)
          texture.needsUpdate = true
          return texture
        }

        addVariable(name: string, shader: string, initialTexture: THREE.DataTexture) {
          const material = new THREE.ShaderMaterial({
            uniforms: { resolution: { value: new THREE.Vector2(this.width, this.height) } },
            fragmentShader: shader,
            vertexShader: `
              void main() {
                gl_Position = vec4(position, 1.0);
              }
            `,
          })

          const renderTargets = [
            new THREE.WebGLRenderTarget(this.width, this.height, {
              wrapS: THREE.ClampToEdgeWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
              minFilter: THREE.NearestFilter,
              magFilter: THREE.NearestFilter,
              format: THREE.RGBAFormat,
              type: THREE.FloatType,
            }),
            new THREE.WebGLRenderTarget(this.width, this.height, {
              wrapS: THREE.ClampToEdgeWrapping,
              wrapT: THREE.ClampToEdgeWrapping,
              minFilter: THREE.NearestFilter,
              magFilter: THREE.NearestFilter,
              format: THREE.RGBAFormat,
              type: THREE.FloatType,
            }),
          ]

          const variable = {
            name,
            material,
            renderTargets,
            dependencies: [] as any[],
            currentTextureIndex: 0,
            initialTexture,
          }

          this.variables.push(variable)
          return variable
        }

        setVariableDependencies(variable: any, dependencies: any[]) {
          variable.dependencies = dependencies
        }

        init() {
          const plane = new THREE.PlaneGeometry(2, 2)

          for (const variable of this.variables) {
            this.passThruUniforms.passThruTexture.value = variable.initialTexture
            const mesh = new THREE.Mesh(plane, this.passThruShader)
            this.scene.add(mesh)

            this.renderer.setRenderTarget(variable.renderTargets[0])
            this.renderer.render(this.scene, this.camera)
            this.renderer.setRenderTarget(variable.renderTargets[1])
            this.renderer.render(this.scene, this.camera)

            this.scene.remove(mesh)
          }
          this.renderer.setRenderTarget(null)
        }

        compute() {
          const plane = new THREE.PlaneGeometry(2, 2)

          for (const variable of this.variables) {
            for (const dep of variable.dependencies) {
              const uniformName = dep.name
              variable.material.uniforms[uniformName] = {
                value: dep.renderTargets[dep.currentTextureIndex].texture,
              }
            }

            const currentIndex = variable.currentTextureIndex
            const nextIndex = 1 - currentIndex

            const mesh = new THREE.Mesh(plane, variable.material)
            this.scene.add(mesh)

            this.renderer.setRenderTarget(variable.renderTargets[nextIndex])
            this.renderer.render(this.scene, this.camera)

            this.scene.remove(mesh)

            variable.currentTextureIndex = nextIndex
          }

          this.renderer.setRenderTarget(null)
        }

        getCurrentRenderTarget(variable: any) {
          return variable.renderTargets[variable.currentTextureIndex]
        }
      }

      // Shader code
      const shaderPartialSimplexNoise = `
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){ 
          const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1. + 3.0 * C.xxx;
          i = mod(i, 289.0 ); 
          vec4 p = permute( permute( permute( 
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }`

      const shaderPartialCurlNoise = `
        ${shaderPartialSimplexNoise}
        vec3 snoiseVec3( vec3 x ){
          float s = snoise(vec3( x ));
          float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
          float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
          return vec3( s , s1 , s2 );
        }
        vec3 curlNoise( vec3 p ){
          const float e = .1;
          vec3 dx = vec3( e, 0.0, 0.0 );
          vec3 dy = vec3( 0.0, e, 0.0 );
          vec3 dz = vec3( 0.0, 0.0, e );
          vec3 p_x0 = snoiseVec3( p - dx );
          vec3 p_x1 = snoiseVec3( p + dx );
          vec3 p_y0 = snoiseVec3( p - dy );
          vec3 p_y1 = snoiseVec3( p + dy );
          vec3 p_z0 = snoiseVec3( p - dz );
          vec3 p_z1 = snoiseVec3( p + dz );
          float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
          float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
          float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
          return normalize( vec3( x , y , z ) / ( 2.0 * e ) );
        }`

      const shaderSimulationPosition = `
        uniform float delta;
        uniform vec2 resolution;
        uniform sampler2D texturePosition;
        uniform sampler2D textureVelocity;
        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 position = texture2D(texturePosition, uv).xyz;
            vec3 velocity = texture2D(textureVelocity, uv).xyz;
            gl_FragColor = vec4(position + velocity * delta, 1.0);
        }`

      const shaderSimulationVelocity = `
        ${shaderPartialCurlNoise}
        
        uniform vec2 resolution;
        uniform sampler2D texturePosition;
        uniform sampler2D textureVelocity;

        const float CENTER_MASS = 1.0;
        const float PARTICLE_MASS = 1.0;
        const float VELOCITY_TERMINAL = 0.012;
        const float CURL_RADIUS = 0.6;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 position = texture2D(texturePosition, uv).xyz;
            vec3 velocity = texture2D(textureVelocity, uv).xyz;
            float distance = length(position);
            float curlForce = min(distance, CURL_RADIUS) / CURL_RADIUS;
            vec3 curlVelocity = curlNoise(position) - velocity;
            float pullForce = abs((CENTER_MASS * PARTICLE_MASS) / (distance * distance));
            vec3 pull = min(pullForce, VELOCITY_TERMINAL) * -normalize(position);
            vec3 newVelocity = velocity + curlVelocity * curlForce + pull * 12.0;
            gl_FragColor = vec4(newVelocity, 1.0);
        }`
      const shaderPointFragment = `
        void main() {
            gl_FragColor = vec4(0.1, 0.5, 1.0, 0.6);
        }`

      const shaderPointVertex = `
        attribute vec2 reference;
        uniform sampler2D texturePosition;
        void main() {
            vec3 pos = texture2D(texturePosition, reference).xyz;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = 4.5 * (1.0 / -mvPosition.z);
        }`

      // Reduce particle count on lower-end devices for better performance
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5)
      let TEXTURE_SIZE = 512
      if (pixelRatio < 1) TEXTURE_SIZE = 256
      const TEXTURE_HEIGHT = TEXTURE_SIZE
      const TEXTURE_WIDTH = TEXTURE_SIZE * 2

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
      camera.position.set(0, 0, 4)

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.powerPreference = 'high-performance'

      let rotationY = 0

      const points = TEXTURE_WIDTH * TEXTURE_HEIGHT
      const vertices = new Float32Array(points * 3).fill(0)
      const references = new Float32Array(points * 2)

      for (let i = 0; i < references.length; i += 2) {
        const indexVertex = i / 2
        references[i] = (indexVertex % TEXTURE_WIDTH) / TEXTURE_WIDTH
        references[i + 1] = Math.floor(indexVertex / TEXTURE_WIDTH) / TEXTURE_HEIGHT
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
      geometry.setAttribute("reference", new THREE.BufferAttribute(references, 2))

      const material = new THREE.ShaderMaterial({
        uniforms: { texturePosition: { value: null } },
        fragmentShader: shaderPointFragment,
        vertexShader: shaderPointVertex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      gpuCompute = new GPUComputationRenderer(TEXTURE_WIDTH, TEXTURE_HEIGHT, renderer)

      const dataPos = gpuCompute.createTexture()
      const dataVel = gpuCompute.createTexture()

      for (let i = 0; i < dataPos.image.data.length; i += 4) {
        const radius = (1 - Math.pow(Math.random(), 3)) * 1.5
        const azimuth = Math.random() * Math.PI
        const inclination = Math.random() * Math.PI * 2
        dataPos.image.data[i] = radius * Math.sin(azimuth) * Math.cos(inclination)
        dataPos.image.data[i + 1] = radius * Math.cos(azimuth)
        dataPos.image.data[i + 2] = radius * Math.sin(azimuth) * Math.sin(inclination)
        dataPos.image.data[i + 3] = 1
      }

      varVel = gpuCompute.addVariable("textureVelocity", shaderSimulationVelocity, dataVel)
      varPos = gpuCompute.addVariable("texturePosition", shaderSimulationPosition, dataPos)

      gpuCompute.setVariableDependencies(varVel, [varVel, varPos])
      gpuCompute.setVariableDependencies(varPos, [varVel, varPos])
      varPos.material.uniforms.delta = { value: 0 }

      gpuCompute.init()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)

        const now = Date.now() / 1000
        const delta = now - previousFrame
        previousFrame = now

        rotationY += 0.0005
        camera.position.x = Math.sin(rotationY) * 4
        camera.position.z = Math.cos(rotationY) * 4
        camera.lookAt(0, 0, 0)

        gpuCompute.compute()

        varPos.material.uniforms.delta.value = Math.min(delta, 0.05)
        particles.material.uniforms.texturePosition.value = gpuCompute.getCurrentRenderTarget(varPos).texture

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    initScene()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (renderer) {
        renderer.dispose()
      }
      if (scene) {
        scene.traverse((object: any) => {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: any) => mat.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} style={{ display: "block", overflow: "hidden", width: "100%", height: "100%" }} />
    </div>
  )
}
