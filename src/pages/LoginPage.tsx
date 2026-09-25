import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  useEffect(() => {
    if (step !== "code" || timer === 0) return;
    const timeout = window.setTimeout(
      () => setTimer((value) => value - 1),
      1000
    );
    return () => window.clearTimeout(timeout);
  }, [step, timer]);
  const submitPhone = (event: React.FormEvent) => {
    event.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Проверь номер телефона");
      return;
    }
    setError("");
    setStep("code");
  };
  const submitCode = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length !== 4) {
      setError("Введи 4 цифры");
      return;
    }
    navigate("/chats");
  };
  return (
    <div className="login-page">
      <span className="logo">Ochag</span>
      {step === "phone" ? (
        <form style={{ display: "grid", gap: 10 }} onSubmit={submitPhone}>
          <input
            autoFocus
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Телефон или имя пользователя"
          />
          {error && <span className="login-error">{error}</span>}
          <button className="btn primary" type="submit">
            Войти
          </button>
        </form>
      ) : (
        <form style={{ display: "grid", gap: 10 }} onSubmit={submitCode}>
          <input
            autoFocus
            className="code-input"
            inputMode="numeric"
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="Код из SMS"
          />
          {error && <span className="login-error">{error}</span>}
          <p className="login-alt">
            Код отправлен на {phone || "твой номер"} ·{" "}
            {timer ? `0:${String(timer).padStart(2, "0")}` : "запросить снова"}
          </p>
          <button className="btn primary" type="submit">
            Подтвердить
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => {
              setStep("phone");
              setCode("");
              setError("");
            }}
          >
            Изменить номер
          </button>
        </form>
      )}
      <p className="login-alt">
        Забыли пароль? <b>Восстановить</b>
      </p>
      <div
        style={{
          borderTop: "1px solid #262626",
          width: "100%",
          margin: "10px 0",
        }}
      />
      <p className="login-alt">
        Нет аккаунта? <b>Зарегистрироваться</b>
      </p>
    </div>
  );
}
