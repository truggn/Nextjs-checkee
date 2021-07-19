import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NProgress from 'nprogress'
import { Formik, Form } from 'formik'

const FormModal = (props) => {
  const dispatch = useDispatch()
  const isFirstMount = useRef(true)
  const [waiting, setWaiting] = React.useState(false) 
  const [open, setOpen] = useState(props.open || false)
  const { component: Component } = props
  const { defaultText } = props || "Open form"
  const { action } = props || null
  const { requestState } = props // get error and working state
  const { children: ChildComponent } = props

  useEffect(() => {
    if(!isFirstMount.current && !requestState.isWorking) {
      setWaiting(false)
      NProgress.done()

      if(!requestState.error) {
        setOpen(false)
      }
    }
  }, [requestState])

  const handleClickOpen = () => {
    setOpen(true);
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    NProgress.start()
    setWaiting(true)
    dispatch(action(values))
  }

  return (
    <React.Fragment>
      {
        Component ?
          <Component onClick={handleClickOpen} {...props.componentProps}>
            {defaultText}
          </Component>
        : <span onClick={handleClickOpen}>
          {defaultText}
        </span>
      }
      <Dialog maxWidth={props.maxWith || 'lg'} fullWidth scroll="body" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <Formik
            initialValues={props.formProps?.initialFormValues}
            validationSchema={props.formProps?.validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              const {values, touched, errors, handleChange, setFieldError, setFieldValue, setFieldTouched} = formikProps;
              return (
                <Form>
                  <DialogTitle id="form-dialog-title">{props.title || 'Form title'}</DialogTitle>
                  <DialogContent>
                    <ChildComponent values={values} touched={touched} errors={errors} handleChange={handleChange} setFieldError={setFieldError} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched}/>
                    </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Hủy
                    </Button>
                    <Button type="submit" disabled={waiting} variant="contained" color="primary">
                      Gửi
                    </Button>
                  </DialogActions>
                </Form>
            )}}
          </Formik>
      </Dialog>
    </React.Fragment>
  )
}

export default FormModal

// <Formik
// initialValues={props.form.initialValues}
// validationSchema={props.form.validationSchema}
// onSubmit={handleSubmit}
// >{(props) => (
    
// )}
// </Formik>