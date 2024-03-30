import { BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial, Scene } from "three";





//Lightを設定する。
export function setStarrySky(scene: Scene){
    const geometry = new BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {

        vertices.push(MathUtils.randFloatSpread(2000)); // x
        vertices.push(MathUtils.randFloatSpread(2000)); // y
        vertices.push(MathUtils.randFloatSpread(2000)); // z

    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const particles = new Points(geometry, new PointsMaterial({ color: 0x888888 }));
    scene.add(particles);
}