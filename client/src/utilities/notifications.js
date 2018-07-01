import { toast } from 'react-toastify';

const success = msg => toast.success(msg);
const error = msg => toast.error(msg);

export { success, error };

export default {
  success,
  error
};
