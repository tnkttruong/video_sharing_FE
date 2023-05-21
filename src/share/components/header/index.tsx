import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from "../../partials/Button";
import { Input } from "../../partials/Input";
import { EMAIL_PATTERN } from "../../constants/pattern";
import { login, updateCurrentUser } from "./login.actions";
import { useDispatch, useSelector } from 'react-redux';
import "./Header.scss";
interface IFormValues {
    email: string;
    password: string;
}
export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.authReducer);

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
          const currentUser = {email: data.email, id: data.id}
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
          dispatch(updateCurrentUser(currentUser))
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

  const handleLogout = async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUser')
    dispatch(updateCurrentUser(null))
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/');
  }

  return (
    <>
      <div className="toolbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
             <img className="navbar-logo" src="./assets/logo-new-white-small.png" alt="logo"></img>
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            { currentUser?.id ? (
              <>
                <span>Wellcome  {currentUser.email} </span>
                <Link className="btn btn-primary share-link" to="/share_video">
                  Share a movie
                </Link>
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
