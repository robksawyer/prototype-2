/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

import { useTweaks } from 'use-tweaks'
import { useInView } from 'react-intersection-observer'
import useMobileDetect from 'use-mobile-detect-hook'
import { easeExpInOut, easeBackInOut } from 'd3-ease'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber'

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import {
  MathUtils,
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  Vector3,
  BoxHelper,
  SpotLightHelper,
  PointLightHelper,
  Color,
} from 'three'
import {
  Html,
  useHelper,
  OrbitControls,
  shaderMaterial,
  useCubeTexture,
} from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
import { gsap } from 'gsap'

import styles from './MainScene.module.css'

import Loader from '../Loader'

// Custom Shader
import * as carPaintVert from './shaders/carPaint.vert'
import * as carPaintFrag from './shaders/carPaint.frag'

import * as cubeMapVert from './shaders/cubeMap.vert'
import * as cubeMapFrag from './shaders/cubeMap.frag'

const CarPaintMaterial = shaderMaterial(
  {
    flakeScale: 1.0,
    paintColor1: new Color(0.2, 0.0, 0.1),
    paintColor2: new Color(0.2, 0.0, 0.1),
    paintColor3: new Color(0.2, 0.0, 0.1),
    normalPerturbation: 1.4,
    microflakePerturbationA: 1.0,
    microflakePerturbation: 1.0,
    glossLevel: 1.0,
    brightnessFactor: 1.0,
    envMap: '',
  },
  carPaintVert,
  carPaintFrag
)

const CubeMapMaterial = shaderMaterial(
  {
    cubemap: '',
  },
  cubeMapVert,
  cubeMapFrag
)

extend({ CarPaintMaterial, CubeMapMaterial })

const ZoomIn = () => {
  const vec = new THREE.Vector3(0, 15, 30)
  return useFrame(({ camera }) => camera.position.lerp(vec, 0.1))
}

// Effects for the main scene
const Effects = () => {
  return <EffectComposer></EffectComposer>
}

const Scene = () => {
  const mesh = useRef()
  const { scene } = useThree()
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  const envMap = useCubeTexture(
    [
      'sky_px.png',
      'sky_nx.png',
      'sky_py.png',
      'sky_ny.png',
      'sky_pz.png',
      'sky_nz.png',
    ],
    { path: '/3d/sky0/' }
  )

  const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
  bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
  bumpMap.repeat.set(1, 1)

  // useEffect(() => {
  //   if (envMap) {
  //     // mesh.current.material.uniforms['envMap'].value = envMap
  //     console.log('mesh.current.material', mesh.current.material)
  //     mesh.current.material.uniforms['cubemap'].value = envMap
  //     mesh.current.material.uniformsNeedUpdate = true
  //   }
  // }, [envMap])

  useFrame(({ clock }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)
    group.current.rotation.y += 0.02
  })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])
  // useHelper(spotLight, SpotLightHelper, 'teal')
  // useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')
  // useHelper(mesh, BoxHelper, '#272740')
  // useHelper(mesh, VertexNormalsHelper, 1, '#272740')
  // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')

  // Animate stuff
  useEffect(() => {
    console.log('mesh.current.material', mesh.current.material)
    gsap.to(mesh.current.material, {
      roughness: 0.5,
      duration: 3,
      ease: easeBackInOut,
      repeat: -1,
      yoyo: true,
    })
  }, [mesh])

  return (
    <>
      <pointLight position={[-10, 0, -20]} color="#3083DC" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="#1ECBF8"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />

      <mesh ref={mesh} position={[0, 2, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial
          envMap={envMap}
          attach="material"
          roughness={0}
          metalness={0.9}
          bumpMap={bumpMap}
          color="#3083DC"
        />
        {/* <carPaintMaterial attach="material" /> */}
        {/* <shaderMaterial
          attach="material"
          uniforms={{ cubemap: ??? }}
          vertexShader={cubeMapVert}
          fragmentShader={cubeMapFrag}
        /> */}
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <ErrorBoundary>
      <Tag
        colorManagement
        shadowMap
        camera={{ position: [-5, 5, 5] }}
        className={`${styles.main_scene} ${
          styles[`main_scene__${variant}`]
        } ${className}`}
        style={{
          width: '100vw',
          height: 'calc(100vh - 50px)',
          background: 'floralwhite',
        }}
      >
        <fog attach="fog" args={['floralwhite', 0, 20]} />
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }
        >
          <Scene />
        </Suspense>

        {/* <Effects /> */}
        <OrbitControls />
      </Tag>
    </ErrorBoundary>
  )
}

MainScene.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene
