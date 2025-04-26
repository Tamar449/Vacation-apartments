import { useState, useEffect } from "react";

export const ImageSlider = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // העברת התמונות שהתקבלו בפרופס למערך 
  // (כדי לאפשר ביצוע map)
  const slidesData = [...props.images]

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
  };

  const setCurrentSlide = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return <div className="slider">
    <div className="slider-container">
      {slidesData.map((slide, index) => (
        <div key={index} className={`slide ${index === slideIndex ? "active" : "hidden"}`} style={{ display: index === slideIndex ? "block" : "none" }}>
          <img className="slide-image" src={`${process.env.PUBLIC_URL}${slide}`} alt={slide} />
          <div className="slide-number-container">
            <p className="slider-number">{index + 1}</p>
            <hr />
            <p className="slider-number">{slidesData.length}</p>
          </div>
        </div>
      ))}

      {/*  כפתורים להעברת התמונות (מיותר כי הנקודות הם גם כפתורים) */}
      {/* <div className="slider-nav">
        <button className="slider-nav-btn" onClick={prevSlide}>
          <IonIcon icon={caretBackOutline} />
          {`<`}
        </button>
        <button className="slider-nav-btn" onClick={nextSlide}>
          <IonIcon icon={caretForwardOutline} />
          {`>`}
        </button>
      </div> */}

      <div className="dot-container">
        {slidesData.map((_, index) => (
          <span key={index} className={`dot ${index === slideIndex ? "active" : ""}`} onClick={() => setCurrentSlide(index)}></span>
        ))}
      </div>
    </div>
  </div>
};

