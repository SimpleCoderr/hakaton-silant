import { TIRole } from 'shared/interfaces';

export const checkRoleAccess = (
  role: TIRole | undefined,
  actionType: 'createCar' | 'addInspection' | 'addComplaint',
) => {
  switch (role) {
    case 'ROLE_MANAGER':
      return true;
    case 'ROLE_CLIENT': {
      return actionType === 'addInspection';
    }
    case 'SERVICE_ORGANISATION': {
      return actionType === 'addComplaint' || actionType === 'addInspection';
    }
    default:
      return false;
  }
};
