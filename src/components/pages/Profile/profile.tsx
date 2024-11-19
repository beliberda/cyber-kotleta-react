import { observer } from "mobx-react-lite";
import s from "./style.module.css";
import UserStore from "@/components/store/UserStore";
import Header from "@/components/widjets/Header/header";
import { navMain } from "@/components/routes/navigations";

function ProfilePage() {
  return (
    <>
      <Header navigations={navMain} />
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
      </main>
    </>
  );
}

export default observer(ProfilePage);
