import ButtonCornerStyle from "@/components/common/ButtonCornerStyle/ButtonCornerStyle";
import { Reveal } from "@/components/common/Motion/Reveal";

export interface DataContact {
  image: string;
  title: string;
  paragraph: string;
}

export interface PolicySectionProps {
  header: string;
  buttonDescription: string;
  data: DataContact[];
}

export default function PolicySection({
  header,
  buttonDescription,
  data,
}: PolicySectionProps) {
  return (
    <div className="w-full rounded-xl custom-dashed mx-auto font-(--font-roboto) overflow-hidden mt-8 mb-30 sm:mb-20">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-0 custom-dashed-b p-8">
        <h1 className="text-xl font-semibold w-full uppercase">{header}</h1>
        <button className="relative flex items-center justify-center custom-dashed rounded-xl w-full h-[49px] mt-2 md:w-[295px] md:h-[63px] md:mt-0 p-4">
          <ButtonCornerStyle />
          {buttonDescription}
          <div className="w-5 h-5 ml-2">
            <img
              src="/assets/icons/general/arrow.svg"
              className="transform -rotate-45 dark:invert"
              alt="arrow"
            />
          </div>
        </button>
      </div>
      {/* Grid */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full policy-grid">
        {data.map((d, index) => (
          <Reveal
            key={index}
            variant="fade-up"
            distance={10}
            duration={0.5}
            delay={index * 0.15}
            ease="easeOut"
            once={false}
            className="custom-dashed-r custom-dashed-b"
          >
            <div className="flex items-center gap-4 p-4 md:w-full md:h-[226px] h-[159px]">
              <img
                src={d.image}
                alt={d.title}
                className="w-14 h-14 sm:w-20 sm:h-20"
              />
              <div className="w-full">
                <h1 className="text-lg font-medium uppercase font-roboto">
                  {d.title}
                </h1>
                <p className="text-sm font-(--font-robotmono) text-gray-50">
                  {d.paragraph}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
