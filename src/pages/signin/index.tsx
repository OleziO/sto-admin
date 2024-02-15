import React, { BaseSyntheticEvent, useState } from "react";
import cn from "classnames";
import { supabase } from "../../api";
import styles from "./styles.module.scss";

export const SignIn = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const login = async () => {
    const { data } = await supabase
      .from("admins")
      .select("token")
      .eq("username", user.username)
      .eq("password", user.password);
    const token = (data?.length ? data[0].token : "").replaceAll('"', "");
    document.cookie = `token=${JSON.stringify(token)}`;
  };

  return (
    <div className={styles.signinContainer}>
      <form className={styles.form}>
        <label className={styles.signInLabel}>
          <input
            type="text"
            className={cn("form-control", styles.usernameInput)}
            placeholder="username"
            value={user.username}
            onInput={(e: BaseSyntheticEvent) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </label>
        <label className={styles.signInLabel}>
          <input
            type="password"
            className={cn("form-control", styles.passwordInput)}
            placeholder="password"
            value={user.password}
            onInput={(e: BaseSyntheticEvent) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </label>
        <button type="button" className={cn(styles.sign_in)} onClick={login}>
          LOGIN
        </button>
      </form>
    </div>
  );
};
