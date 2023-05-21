import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from "../../share/partials/Input";
import './video.scss'
import { createVideo } from "./video.actions";

interface IFormValues {
    url: string;
}
export const NewVideo = () => {
  const dispatch = useDispatch();
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<IFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      url: '',
    }
  });

  const onSubmit = (e: any) => {
    dispatch(createVideo({
      data: { url: e.url },
      successAction: async (data: any) => {
        if (data) {
          alert('Successful video sharing!');
          setValue('url', '');
        }
      },
    }))
  }

  const loginForm = {
    url: register({
      required: true,
    }),
  }

  return (
    <>
      <div className="container">
        <h2>Share your Youtube movie</h2>
        <form className="new-viveo-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex input-group">
            <label className="f-label d-flex">URL</label>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                name={'url'}
                register={loginForm.url}
                errors={errors}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};
