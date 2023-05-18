import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from "../../partials/Button";
import { Input } from "../../partials/Input";
import { EMAIL_PATTERN } from "../../constants/pattern";
import { login } from "./login.actions";
import { useDispatch, useSelector } from 'react-redux';
import "./Header.scss";
interface IFormValues {
    email: string;
    password: string;
}
export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isHideToolbar, setisHideToolbar] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>();
  const dispatch = useDispatch();

  const { register, formState: { errors }, handleSubmit, watch } = useForm<IFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (e: any) => {
    dispatch(login({
      data: { email: e.email, password: e.password },
      successAction: (data: any) => {
        if (data) {
          localStorage.setItem('accessToken', data.auth_token)
          localStorage.setItem('currentUser', data.email)
          setCurrentUser(data.email)
        }
      },
    }))
  }

  const loginForm = {
    email: register({
      required: 'Please input email address',
      pattern: {
        value: EMAIL_PATTERN,
        message: 'Please input valid email',
      }
    }),
    password: register({
      required: 'Please input password',
    }),
  }

  const checkAuthEndpoint = () => {
    setisHideToolbar(['videos/new'].includes((pathname.replace('/', ''))))
  }

  const handleLogout = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/');
  }

  useEffect(() => {
    checkAuthEndpoint();
    setCurrentUser(localStorage.getItem('currentUser'))
  }, [pathname])

  return (
    <>
      <div className={isHideToolbar ? "toolbar d-none" : "toolbar"}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
             <img className="navbar-logo" src="./assets/logo-new-white-small.png" alt="logo"></img>
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            { currentUser ? (
              <>
                <span>Wellcome  {currentUser} </span>
                <Button className="btn btn-outline-success logout-btn" disabled={false} onClick={() => handleLogout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <form className="d-flex ml-auto" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    className="form-control me-2"
                    type="text"
                    name={'email'}
                    register={loginForm.email}
                    placeholder="Email"
                    errors={errors}
                  />
                  <Input
                    className="form-control me-2"
                    type="password"
                    name={'password'}
                    register={loginForm.password}
                    placeholder="Password"
                    errors={errors}
                  />
                  <Button className="btn btn-outline-success btn-submit" disabled={false} type="submit">
                    Login / Register
                  </Button>
                </form>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
