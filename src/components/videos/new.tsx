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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<IFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      url: '',
    }
  });

  const onSubmit = (e: any) => {
    if(!e.url){return;}
    dispatch(createVideo({
      data: { url: e.url },
      successAction: async (data: any) => {
        if (data) {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 2000);
          setValue('url', '');
        }
      },
    }))
  }

  const loginForm = {
    url: register({
      required: 'Please input Url',
    }),
  }

  return (
    <>
      <div className="container">
        <h2>Share your Youtube movie</h2>
        {showSuccessMessage && <div className="alert alert-success alert-dismissible">Successful video sharing!</div>}
        <form className="new-viveo-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex input-group">
            <label className="f-label d-flex">URL</label>
            <div className="form-group">
              <Input
                className="form-control url-input"
                type="text"
                name={'url'}
                placeholder="Youtube URL"
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
