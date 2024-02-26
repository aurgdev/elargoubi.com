"use client";

import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

interface Nodes {
  [key: string]: {
    geometry: THREE.BufferGeometry;
  };
}

// Then, you can use the Nodes interface in the code:

function Model(props: any) {
  const group = useRef<THREE.Group>(null);
  // Load model
  const { nodes, materials } = useGLTF("/mac-draco.glb") as unknown as {
    nodes: Nodes;
    materials: any;
  };
  // const { nodes, materials } = useGLTF("/mac-draco.glb");
  // Make it float
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 2) / 20 + 0.25,
        0.1
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 4) / 20,
        0.1
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(t / 8) / 20,
        0.1
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-2 + Math.sin(t / 2)) / 2,
        0.1
      );
    }
  });
  // The jsx graph was auto-generated by: https://github.com/pmndrs/gltfjsx
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            {/* Drei's HTML component can "hide behind" canvas geometry */}
            <Html
              className="overflow-y-auto h-[216px] p-0 rounded-lg w-[334px] bg-secondary text-primary"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude
            >
              <div
                className="scale-50 origin-top-left p-5 h-[668px] w-[668px] "
                onPointerDown={(e) => e.stopPropagation()}
              >
                <About />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

export default function Laptop() {
  return (
    <Canvas
    camera={{ position: [-5, 0, -15], fov: 55 }}
    style={{
        height: "400px",
        width: "500px",
      }}
      className="max-w-[370px] sm:max-w-2xl"
      dpr={[1, 2]}
    >
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
}

function About() {
  return (
    <section className="relative">
      <div className="float-right">
        <img
          alt="El argoubi"
          width="300"
          height="400"
          decoding="async"
          data-nimg="1"
          className="rounded-2xl mb-4 object-cover max-h-[400px] bg-top"
          srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fovl9ud0y%2Fproduction%2Fa55a95bd83a843f449a7cd73aaed3a38c438f047-4730x2660.jpg&amp;w=640&amp;q=100 1x, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fovl9ud0y%2Fproduction%2Fa55a95bd83a843f449a7cd73aaed3a38c438f047-4730x2660.jpg&amp;w=828&amp;q=100 2x"
          src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fovl9ud0y%2Fproduction%2Fa55a95bd83a843f449a7cd73aaed3a38c438f047-4730x2660.jpg&amp;w=828&amp;q=100"
        />
      </div>
      <h1 className="font-incognito font-black tracking-tight text-4xl basis-1/2 mb-8">
        I&apos;m Mohamed El argoubi. I live in Reality, where I ... .
      </h1>
      <div className="text-3xl leading-relaxed">
        <p className="mt-2 mb-6">
          Ever since I was a child, I have been fascinated by computers and
          mathematics. I discovered my passion for programming early on and have
          been honing my skills for the past 5 years. Through my experience as a
          computer programmer, I have developed an innovative tech mind capable
          of working with a variety of technology and software solutions, as
          well as managing databases. I am passionate about technology and a
          valuable team member with experience diagnosing problems and
          developing effective solutions. In addition, I have extensive
          expertise in networking systems and working with mainframe computers.
          As a talented leader with unique ideas and a successful track record
          of contributions to the field, I am always seeking new challenges and
          opportunities to learn and grow as a Full Stack developer. <br />
          My passion for programming and technology has led me to constantly
          seek new knowledge and stay up-to-date with the latest industry
          developments. With a strong work ethic and dedication to delivering
          high-quality projects, I am committed to achieving success and driving
          innovation in all my endeavors.
        </p>
        <h3
          id="object-object-object-object"
          className="font-mono before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80  relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl my-6"
        >
          <a href="#object-object-object-object">
            <br />
            <strong className="font-bold ">Soft Skills</strong>
          </a>
        </h3>
        <p className="mt-2 mb-6"></p>
        <p className="mt-2 mb-6">
          Certain skills Ive picked along the way that deserves mentioning:
        </p>
        <p className="mt-2 mb-6"></p>
        <ul className="list-[square] mt-5 ml-5">
          <li className="mb-4">
            <strong className="font-bold ">Attention to Detail:</strong> I take
            pleasure in creating designs and UIs with careful precision,
            emphasizing quality over quantity.
          </li>
          <li className="mb-4">
            <strong className="font-bold ">Effective Communication:</strong> I
            excel in clear and concise communication, fostering a collaborative
            environment and ensuring that project requirements are understood
            and met.
          </li>
          <li className="mb-4">
            <strong className="font-bold ">Proactive Problem-Solving:</strong> I
            approach challenges with a proactive mindset, identifying and
            addressing issues before they escalate, ensuring a smoother project
            flow.
          </li>
          <li className="mb-4">
            <strong className="font-bold ">Adaptability:</strong> I thrive in
            dynamic work environments, adapting quickly to changes and new
            technologies, allowing me to stay innovative and efficient.
          </li>
          <li className="mb-4">
            <strong className="font-bold ">Time Management:</strong> Recognizing
            the value of time, I am adept at managing my time efficiently,
            ensuring timely completion of assignments and projects.
          </li>
        </ul>
      </div>
      <Link
        href="/about"
        className="text-5xl font-mono font-bold hover:underline pb-10"
      >
        {"<About Page />"}
      </Link>
    </section>
  );
}
