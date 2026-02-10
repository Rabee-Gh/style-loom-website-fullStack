import { type FAQ } from "../../../../type";
interface QuestionCardProps {
  index: number;
  faq: FAQ;
  length: number;
}
function QuestionCard({ faq }: QuestionCardProps) {
  return (
    <div className="flex flex-col justify-center 2xl:p-[60px] xl:p-[50px] p-[30px] h-full">
      <div className="cursor-pointer text-primarybg 2xl:text-2xl xl:text-xl text-lg font-medium">
        {faq.question}
      </div>
      <div className="text-gray-50 font-normal 2xl:mt-[40px] xl:mt-[30px] mt-[25px] 2xl:text-lg xl:text-base text-sm">
        {faq.answer}
      </div>
    </div>
  );
}

export default QuestionCard;
