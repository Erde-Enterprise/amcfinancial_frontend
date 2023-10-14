import { useSnackbar } from 'notistack'

const InnerSnackbarUtilsConfigurator = (props: any) => {
  props.setUseSnackbarRef(useSnackbar())
  return null
}

let useSnackbarRef: any
const setUseSnackbarRef = (useSnackbarRefProp: any) => {
  useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = () => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
  )
}

export const snackActions = {
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration: 5000 })
  },
}
