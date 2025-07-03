'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Boid class remains for the 'boids' animation option
class Boid {
  position: THREE.Vector2;
  velocity: THREE.Vector2;
  acceleration: THREE.Vector2;
  maxSpeed: number;
  maxForce = 0.05;
  color = new THREE.Color();
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;

  constructor(width: number, height: number) {
    this.position = new THREE.Vector2(Math.random() * width, Math.random() * height);
    this.velocity = new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.maxSpeed = Math.random() * 1.5 + 1;
    this.velocity.setLength(this.maxSpeed);
    this.acceleration = new THREE.Vector2();
    this.separationWeight = Math.random() * 0.5 + 1.5;
    this.alignmentWeight = Math.random() * 0.5 + 0.5;
    this.cohesionWeight = Math.random() * 0.5 + 0.5;
  }

  update(width: number, height: number) {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);
    this.acceleration.multiplyScalar(0);
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    this.color.setHSL((angle + Math.PI) / (2 * Math.PI), 0.7, 0.6);
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  applyForce(force: THREE.Vector2) {
    this.acceleration.add(force);
  }

  flock(boids: Boid[]) {
    const separation = this.separate(boids);
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    separation.multiplyScalar(this.separationWeight);
    alignment.multiplyScalar(this.alignmentWeight);
    cohesion.multiplyScalar(this.cohesionWeight);
    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  align(boids: Boid[]) {
    const perceptionRadius = 50;
    const steering = new THREE.Vector2();
    let total = 0;
    for (const other of boids) {
      const d = this.position.distanceTo(other.position);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      steering.setLength(this.maxSpeed);
      steering.sub(this.velocity);
      steering.clampLength(0, this.maxForce);
    }
    return steering;
  }

  cohesion(boids: Boid[]) {
    const perceptionRadius = 60;
    const steering = new THREE.Vector2();
    let total = 0;
    for (const other of boids) {
      const d = this.position.distanceTo(other.position);
      if (other !== this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      const desired = new THREE.Vector2().subVectors(steering, this.position);
      desired.setLength(this.maxSpeed);
      const steer = new THREE.Vector2().subVectors(desired, this.velocity);
      steer.clampLength(0, this.maxForce);
      return steer;
    }
    return steering;
  }

  separate(boids: Boid[]) {
    const perceptionRadius = 24;
    const steering = new THREE.Vector2();
    let total = 0;
    for (const other of boids) {
      const d = this.position.distanceTo(other.position);
      if (other !== this && d < perceptionRadius) {
        const diff = new THREE.Vector2().subVectors(this.position, other.position);
        diff.divideScalar(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.divideScalar(total);
      steering.setLength(this.maxSpeed);
      steering.sub(this.velocity);
      steering.clampLength(0, this.maxForce);
    }
    return steering;
  }
}


const InteractiveThumbnail = ({ animationType = 'wave' }: { animationType?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xeeeeee, 1);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 1;

    let animationObject: THREE.Object3D;
    let waveData: { frequency: number, amplitude: number, phase: number } | null = null;

    if (animationType === 'boids') {
        const boids: Boid[] = [];
        const boidMeshes: THREE.Mesh[] = [];
        const shape = new THREE.Shape();
        shape.moveTo(0, -5);
        shape.lineTo(-2.5, 5);
        shape.lineTo(2.5, 5);
        shape.closePath();
        const boidGeometry = new THREE.ShapeGeometry(shape);

        for (let i = 0; i < 75; i++) {
            const boid = new Boid(width, height);
            boids.push(boid);
            const material = new THREE.MeshBasicMaterial({ color: boid.color });
            const mesh = new THREE.Mesh(boidGeometry, material);
            boidMeshes.push(mesh);
            scene.add(mesh);
        }
        animationObject = new THREE.Group();
        boidMeshes.forEach(m => (animationObject as THREE.Group).add(m));
        (animationObject as any).userData.boids = boids;


    } else { // Default to wave
      const geometry = new THREE.PlaneGeometry(width, height, 50, 50);
      const material = new THREE.MeshBasicMaterial({ color: 0x555555, wireframe: true });
      animationObject = new THREE.Mesh(geometry, material);
      animationObject.position.set(width / 2, height / 2, 0);
      scene.add(animationObject);
      
      waveData = {
        frequency: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 20 + 10,
        phase: Math.random() * Math.PI,
      };
    }

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (animationType === 'wave' && waveData) {
        const positions = (animationObject as THREE.Mesh).geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const y = Math.sin(positions.getX(i) * waveData.frequency + elapsedTime + waveData.phase) * waveData.amplitude;
          positions.setY(i, y);
        }
        positions.needsUpdate = true;
      } else if (animationType === 'boids') {
        const boids = (animationObject as any).userData.boids;
        const boidMeshes = (animationObject as any).children;
        for (let i = 0; i < boids.length; i++) {
            boids[i].flock(boids);
            boids[i].update(width, height);
            boidMeshes[i].position.set(boids[i].position.x, boids[i].position.y, 0);
            boidMeshes[i].rotation.z = boids[i].velocity.angle() - Math.PI / 2;
            (boidMeshes[i].material as THREE.MeshBasicMaterial).color.set(boids[i].color);
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (mountRef.current) {
            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            camera.left = 0;
            camera.right = newWidth;
            camera.top = newHeight;
            camera.bottom = 0;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [animationType]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default InteractiveThumbnail;