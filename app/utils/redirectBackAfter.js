import stringifyLocation from './stringifyLocation';

/*
 * Helper формирует url для обратного редиректа при авторизации
 * */
export default function redirectBackAfter(path, state) {
    return [path, { redirectTo: stringifyLocation(state.location) }];
}