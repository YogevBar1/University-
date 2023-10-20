import "./Home.css";
import imgSrc from "../../../Assets/Images/homeImg.jpg";


function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>Our University</h2>
            <img src={imgSrc} alt="University Image"/>

            <p>Welcome to our University, a leading institution dedicated to providing high-quality education in the field of programming and web development. With a strong commitment to fostering innovative learning experiences, we offer a diverse range of courses that empower students to master essential programming languages and web technologies. Our curriculum is carefully designed to provide a comprehensive understanding of key concepts, including Python, a versatile and powerful programming language; CSS, the cornerstone of web styling; and HTML, the foundation of modern web development. At our University, we pride ourselves on our experienced faculty, cutting-edge resources, and hands-on approach to learning. Whether you're a beginner looking to explore the world of coding or an experienced developer seeking to refine your skills, our University is here to guide you on your journey to becoming a proficient programmer and web developer.</p>
        </div>
    );
}

export default Home;
