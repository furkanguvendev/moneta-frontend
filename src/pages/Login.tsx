import { useForm, type SubmitHandler } from "react-hook-form";
import budget from "../assets/budget.jpeg";

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
    <div className="flex flex-col lg:flex-row w-full min-h-screen justify-around items-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={budget} className="w-96 rounded-3xl"/>
        <h1 className="text-3xl lg:text-5xl">MONETA</h1>
        <h2 className="text-xl lg:text3xl">Finansal takibin en sade yolu</h2>
        <button className="text">Daha fazlası</button>
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
        </form>
        <div className="flex flex-col items-center justify-center">
            <h3>Social Media</h3>
            <div>
              <a href="" title="Portfolio"></a>
              <a href="" title="Linkedin"></a>
              <a href="" title="About Me"></a>
            </div>
          </div>
        <div>
            <span>Don't have an account? </span>
            <a href="/signup">Click here to sign up.</a>
          </div>
      </div>
    </div>
  );
};