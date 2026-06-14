import { useForm, type SubmitHandler } from "react-hook-form";

type login = {
  loginName: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
//    watch,
    formState: { errors },
  } = useForm<login>();

  const onSubmit: SubmitHandler<login> = (data) => console.log(data);

  return (
    <div className="flex flex-row w-full min-h-screen justify-around items-center">
      <div>
        <img />
        <h1>MONETA</h1>
        <h2>Finansal takibin en sade yolu</h2>
        <button>Daha fazlası</button>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign In</h2>
          <p>Sign in to stay connected.</p>

          <div>
            <label>Email</label>
            <input type="email" {...register("loginName", { required: true })} />
            {errors.loginName && <span>This field is required</span>}
          </div>

          <div>
            <label>Password</label>
            <input type="password" {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}
          </div>

          <div>
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me?</label>
            </div>
            <a href="/forgot-password">Forgot Password</a>
          </div>

          <button type="submit">Sign in</button>

          <div>
            <p>or log in using social media</p>
            <div>
              <button type="button">Google</button>
              <button type="button">Facebook</button>
              <button type="button">Instagram</button>
              <button type="button">LinkedIn</button>
            </div>
          </div>

          <div>
            <span>Don't have an account? </span>
            <a href="/signup">Click here to sign up.</a>
          </div>
        </form>
      </div>
    </div>
  );
};