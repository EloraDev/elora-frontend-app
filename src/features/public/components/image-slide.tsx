import image1 from "@/assets/img/section-ai-capabilities-image-1.jpg";
import image2 from "@/assets/img/section-ai-capabilities-image-2.jpg";
import image3 from "@/assets/img/section-ai-capabilities-image-3.jpg";
import image4 from "@/assets/img/section-ai-capabilities-image-4.jpg";
import image5 from "@/assets/img/section-ai-capabilities-image-5.jpg";

function ImageSlide() {
  return (
    <div className="flex gap-x-4.5 overflow-x-scroll [&>*]:shrink-0">
      {/* image ---1 */}
      <div className="relative h-127 w-80.5 overflow-hidden rounded-[39px] bg-(--color-brown)">
        <img
          src={image1}
          alt="AI skin analysis on diverse skin tone - example 1"
          className="absolute top-[10%] right-[10%] size-[100%] scale-[1.5] object-cover"
        />
      </div>

      {/* Image ---2 */}
      <div className="relative h-127 w-80.5 overflow-hidden rounded-[39px] bg-(--color-brown)">
        <img
          src={image2}
          alt="AI skin analysis on diverse skin tone - example 2"
          className="absolute top-[13%] right-[1%] size-[115%] scale-[1.5] object-cover"
        />
      </div>

      {/* Image --------------3 */}
      <div className="relative h-127 w-80.5 overflow-hidden rounded-[39px] bg-(--color-brown)">
        <img
          src={image3}
          alt="AI skin analysis on diverse skin tone - example 3"
          className="absolute top-[3%] right-[0%] size-[120%] scale-[1.25] object-cover"
        />
      </div>

      {/* Image --------------4 */}
      <div className="relative h-127 w-80.5 overflow-hidden rounded-[39px] bg-(--color-brown)">
        <img
          src={image4}
          alt="AI skin analysis on diverse skin tone - example 4"
          className="absolute top-[0%] right-[-20%] size-[125%] scale-[1.35] object-cover"
        />
      </div>

      {/* Image --------------5 */}
      <div className="relative h-127 w-80.5 overflow-hidden rounded-[39px] bg-(--color-brown)">
        <img
          src={image5}
          alt="AI skin analysis on diverse skin tone - example 5"
          className="absolute top-[15%] right-[-5%] size-[110%] scale-[1.55] object-cover"
        />
      </div>
    </div>
  );
}

export default ImageSlide;
