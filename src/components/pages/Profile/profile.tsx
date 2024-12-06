import { observer } from "mobx-react-lite";
import s from "./style.module.css";
import UserStore from "@/components/store/UserStore";

function ProfilePage() {
  return (
    <>
      <main className={s.main + " container"}>
        <h1>Профиль</h1>
        <p>
          {UserStore.user.firstName} {UserStore.user.lastName}
        </p>
        {UserStore.user.roles && (
          <p>
            Роли:{" "}
            {UserStore.user.roles.map((role) => {
              return <span key={role.id}>{role.description}</span>;
            })}
          </p>
        )}
        <p>Телефон: {UserStore.user.phoneNumber}</p>
        <p>Рейтинг пользователя: {UserStore.user.rating}</p>
      </main>
    </>
  );
}

export default observer(ProfilePage);
