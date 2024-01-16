import { GO_TO_WINDOW} from "./navigationReducer";

const historyMiddleware = store => next => action => {
    next(action);

    if (action.type===GO_TO_WINDOW) {
        const browserIndex = store.getState().navigation.browserIndex;
        history.pushState({"browserIndex":browserIndex}, '', '');
    }
};

export default historyMiddleware;