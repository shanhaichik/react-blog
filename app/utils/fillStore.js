/* components may define a static `fetchData` method
 which returns a store-dispatchable action.
 using `redux-thunk` means that these actions may be
 functions like promises. */
export default function(redux, nextState, components) {
    return Promise.all(components.map(async Component => {
        Component = Component && Component.WrappedComponent || Component;

        if (!Component || !Component.fillStore) { return; }

        /* return the promise created by the dispatched action
         in `component.fillStore` */
        await Component.fillStore(redux, nextState);
    }));
}