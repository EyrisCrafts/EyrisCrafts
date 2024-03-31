
interface Props {
  text: string;

}

export default function TitleText({text}: Props){
  return (
    <>
      <p className="text-2xl text-title-grey mb-5 mt-7">{text}</p>
    </>
  );
}