import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";


function AboutUsCarousel({ slides }) {
    return (
        <Carousel>
            {slides.map((slide, index) => (
                <Carousel.Item key={index} interval={3000}>
                    <img
                        className="d-block w-100"
                        src={slide.image}
                        alt={slide.title}
                        style={{ height: "400px", objectFit: "cover" }}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                        <a href={slide.linkUrl} target="_blank" rel="noopener noreferrer">
                            {slide.linkName}
                        </a>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default function AboutUs() {
    const personenSlides = [
        { image: "../assets/ich.jpeg", title: "Fabian Beck", description: "CEO & CAO" },
        { image: "../assets/oscar.jpeg", title: "Oscar Peach", description: "CTO & CAO" },
        { image: "../assets/huet.jpeg", title: "Aaron Noah Windisch", description: "CMO" },
        { image: "../assets/cool.jpeg", title: "Alan Barzanji", description: "CPO" },
    ];

    return (
        <section className="about-us">
            <h2 className="text-center">Das sind wir</h2>
            <div className="carousel-container my-4">
                <AboutUsCarousel slides={personenSlides} />
            </div>
            <div className="about-text mt-4">
                <h4>Über uns – Limeli</h4>
                <p>
                    Wir sind Limeli, eine kleine, aber leidenschaftliche Firma aus der Schweiz, die sich dem Ziel
                    verschrieben hat, hochwertige und nachhaltige Getränke zu kreieren, die den Alltag bereichern
                    und das Wohlbefinden fördern. Unsere Philosophie basiert auf der Überzeugung, dass die Natur uns
                    alles bietet, was wir für ein gesundes und erfülltes Leben brauchen – und wir möchten diese
                    Schätze in jedem unserer Produkte zur Geltung bringen.
                </p>

                <h4>Unsere Geschichte</h4>
                <p>
                    Wir waren einst eine kleine Gruppe aus dem Freifach Gründe dein unternehmen. Wir haben uns
                    lange den Kopf zerbrochen was für ein produkt wir auf den Markt bringen wollen. Wir hatten
                    ideen wie eine Günstige alternative zu den teuren Airtag von Apple, ein magnet ständer für
                    eine magische optik in deinem Wohnzimmer, Glace mit knusper Müesli und sogar ein Selbsterwärmendes
                    Dosengetränk. Wir haben uns am ende auf etwas simples geeinigt, wir wollten eine Bio Limonade mit
                    dem Zuckerersatz honig auf den Markt bringen. Wir haben uns also daran gesetzt uns ein retzept
                    auszudenken, was uns schnell gelungen ist. Es beinhaltet, wie das Original hier auf der Webseite,
                    Honig, Tee, Apfelessig und Traubensaft. Bedauerlicherweise hat es unsere limo nie in die
                    Produktion geschaft. Aus unglücklichen umständen hat sich unser Team aufgelöst. Die Individuellen
                    visionen für unser produkt waren zu verschieden und die Arbeitmoral hat gefehlt. Wir haben probiert
                    uns zu reten indem wir die person ersetzten die ausserhalb der oblogatorischen Schulstunden, bei
                    denen wir uns traffen, nicht erreichbar ist und auch nichts in seiner freizeit getan hat. Die
                    Klassenperson der 2I Sophie Nemet konnte uns dabei helfen. Sie empfohl uns eine passende person
                    die den pasten bestens auffüllen hätte können. Leider war es da schon zu spät. Wir haben wenige
                    Tage danach unser Team bei Herrn Lautenschlagen offiziel abgemeldet. Die Rezeptur habe ich dann
                    privat zuhause nach gemacht und ich bin überzeugt davon das wir es weit gebracht hätten.
                </p>

                <div className="about-image-grid">
                    <img src="../assets/Oscar.png" alt="Bild 1"/>
                    <img src="../assets/Erde.png" alt="Bild 2"/>
                    <img src="../assets/Alan.png" alt="Bild 3"/>
                    <img src="../assets/Zaun.png" alt="Bild 4"/>
                </div>

                <h4>Unsere Produkte</h4>
                <p>
                    Jedes Limeli-Produkt ist ein Zeugnis unseres Engagements für Qualität und Nachhaltigkeit. Wir
                    verwenden ausschließlich ausgewählte Bio-Zutaten, die aus fairen und regionalen Quellen stammen.
                    Unser Hauptaugenmerk liegt auf der Kombination von natürlichen Zutaten wie Schweizer
                    Alpenkräutern, Honig, Apfelessig und Traubensaft – die Grundlage für den einzigartigen Geschmack
                    und die gesundheitsfördernden Eigenschaften unserer Getränke.
                </p>
                <div className="about-video-container">

                    <video controls className="about-video">
                        <source src="../assets/0120.mp4" type="video/mp4"/>
                        Dein Browser unterstützt das Video-Tag nicht.
                    </video>
                </div>


                <h4>Nachhaltigkeit und Fairness</h4>
                <p>
                    Nachhaltigkeit ist ein zentrales Anliegen von Limeli. Wir glauben, dass jedes Unternehmen
                    Verantwortung für die Umwelt und die Gesellschaft übernehmen sollte. Deshalb setzen wir auf
                    umweltfreundliche Verpackungen und legen großen Wert auf die Auswahl unserer Lieferanten, die
                    sich ebenfalls den Prinzipien des Fair Trade und der Nachhaltigkeit verpflichtet fühlen.
                </p>

                <h4>Unsere Vision</h4>
                <p>
                    Limeli war gedacht als erstes BIO Softgetränk auf den Markt zukommen. Wir wollten das Bio der
                    neue
                    Standarts wird und mit unserem Getränk ein Stein für eine Gesunde und umweltfreundlich umgebung
                    zu
                    setzten. Aber das war noch nicht alles. Wir wollten an die Spitze, an die Spitze der schweizer
                    Getränke und den Momentanen König von seinem Tron stossen, Rivela.
                </p>

                <h4>Unsere Werte</h4>
                <ul>
                    <li>
                        <strong>Qualität</strong>: Wir setzen nur auf hochwertige, natürliche Zutaten aus
                        kontrolliertem biologischen Anbau.
                    </li>
                    <li>
                        <strong>Nachhaltigkeit</strong>: Unsere Produkte werden unter Berücksichtigung der Umwelt
                        produziert, und wir achten auf nachhaltige Produktionsmethoden und Verpackungen.
                    </li>
                    <li>
                        <strong>Fairness</strong>: Wir engagieren uns für den fairen Handel und den direkten
                        Austausch mit den Bauern und Lieferanten unserer Zutaten.
                    </li>
                    <li>
                        <strong>Innovation</strong>: Wir sind immer auf der Suche nach neuen Möglichkeiten, unsere
                        Produkte zu verbessern und die Bedürfnisse unserer Kunden zu erfüllen.
                    </li>
                </ul>

                <h4>Unser Versprechen</h4>
                <p>
                    Mit jedem Limeli-Produkt möchten wir dir ein Stück Natur näherbringen. Wir versprechen dir, dass
                    wir stets auf Qualität, Transparenz und Nachhaltigkeit setzen, um dir ein Getränk zu bieten, das
                    nicht nur gut schmeckt, sondern auch gut für dich und die Welt ist.
                </p>

                <h4>Schweizer Handwerkskunst – Made with Love</h4>
                <p>
                    Limeli ist mehr als nur ein Getränk – es ist ein Stück Schweizer Handwerkskunst. Unsere
                    Leidenschaft für Qualität und Präzision spiegelt sich in jedem Schluck Limeli wider.
                </p>

                <h4>Danke, dass du Teil unserer Reise bist!</h4>
                <p>
                    Wir sind stolz darauf, dass du dich für Limeli entschieden hast. Gemeinsam können wir einen
                    kleinen
                    Beitrag zu einer nachhaltigeren Zukunft leisten. Willkommen in der Limeli-Familie!
                </p>
            </div>
        </section>
    );
}
