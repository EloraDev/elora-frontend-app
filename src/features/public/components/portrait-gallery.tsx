interface Portrait {
  src: string
  alt: string
  width?: string
  opacity?: number
}

interface PortraitGalleryProps {
  portraits: Portrait[]
}

export const PortraitGallery = ({ portraits }: PortraitGalleryProps) => {
  return (
    <div className="flex gap-4 md:gap-6 mt-12 overflow-x-auto pb-4 hide-scollbar">
      {portraits.map((portrait, index) => (
        <div
          key={index}
          className={`flex-shrink-0 ${portrait.width || "w-[200px] md:w-[250px] lg:w-[322px]"} h-[300px] md:h-[350px] lg:h-[506px] rounded-4xl overflow-hidden`}
          style={{ opacity: portrait.opacity ?? 1 }}
        >
          <img
            src={portrait.src}
            alt={portrait.alt}
            className="w-full h-full object-cover rounded-4xl"
            style={{
              objectPosition: "center top",
              transform: "scale(1.6)",
            }}
          />
        </div>
      ))}
    </div>
  )
}

