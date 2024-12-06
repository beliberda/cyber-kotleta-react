import s from "./style.module.css";

const lections = [
  {
    title: "Урок 1",
    url: "https://drive.google.com/file/d/1YP1ML-UCNAW_oAnOFEG6LWysc74-1gBz/preview",
  },
  {
    title: "Урок 2",
    url: "https://drive.google.com/file/d/10MEis_desCg5pjLq4bHsntY0_MIl3wux/preview",
  },
  {
    title: "Урок 3",
    url: "https://drive.google.com/file/d/1ohgFOceCYXt-T61MdYSuEleNG96-nx-1/preview",
  },
  {
    title: "Урок 4",
    url: "https://drive.google.com/file/d/1vQ_v8hrwAYpYtDM3lyaN69q5xiwYomU8/preview",
  },
  {
    title: "Урок 5",
    url: "https://drive.google.com/file/d/1yYu2XDhxMgAtQw_UAeWuBtiw3pagzLcI/preview",
  },
  {
    title: "Урок 6",
    url: "https://drive.google.com/file/d/1zbersIVPbb_VcdEF_11jFHYL9u9IEfRz/preview",
  },
];

function LectionsPage() {
  return (
    <>
      <main className={s.main + " container"}>
        <h1>Лекции</h1>
        {lections.map((lection, index) => (
          <div key={index} className={s.lection}>
            <h2>{lection.title}</h2>
            <iframe
              title={lection.title}
              src={lection.url}
              width="100%"
              height={600}
            />
          </div>
        ))}
      </main>
    </>
  );
}

export default LectionsPage;
