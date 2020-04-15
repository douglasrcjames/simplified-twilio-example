import React, { createContext, useContext, useState } from 'react';
import { TwilioError } from 'twilio-video';
import { functions } from "../Fire.js";

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(name: string, room: string): Promise<string>;
  isAuthReady?: boolean;
  isFetching: boolean;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  let contextValue = {
    error,
    setError,
    isFetching,
  } as StateContextType;
  

  const getToken: StateContextType['getToken'] = (name, room) => {
    var data = {
      uid: name,
      questionId: room
    }
    setIsFetching(true);
    return functions.httpsCallable('twilioTokenHandler')(data).then((response: any) => {
      setIsFetching(false);
			return response.data.token
		}).catch((error: any) => {
      setIsFetching(false);
      setError(error);
      console.error("Error getting Twilio token: ")
      console.error(error)
      return Promise.reject(error);
    });
   
  };

  return <StateContext.Provider value={{ ...contextValue, getToken }}>{props.children}</StateContext.Provider>;
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
