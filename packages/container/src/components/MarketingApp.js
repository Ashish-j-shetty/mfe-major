import React, { useRef, useEffect } from "react";
import { mount as mountMarketing } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default function MarketingApp() {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    //? onParentNavigate sent from the marketing mfe.
    const { onParentNavigate } = mountMarketing(ref.current, {
      onNavigate: (location) => {
        const { pathname: nextPathname } = location;

        //?  re routing as parent chagnes go down to child anc child changes go up to parent this can easily cause infinite re routing ,
        //?  to stop that we can need to do this check.

        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
}
