interface ProcessStepProps {
  title: string
  description: string
  iconImage: string
}

export const ProcessStep = ({
  title,
  description,
  iconImage,
}: ProcessStepProps) => {
  return (
    <div className="bg-[#5C321D] rounded-4xl w-[314px] text-[#FFFFFF]">
      <div className="mb-2">
        <div
          className="w-full h-[332px] rounded-2xl flex items-center justify-center overflow-hidden"
        >
          <img src={iconImage} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="pb-4 px-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

