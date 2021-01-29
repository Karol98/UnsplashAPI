import React from "react";
import {createApi} from "unsplash-js";
import nodeFetch from "node-fetch";

const unsplash = createApi({
    accessKey: 'ot1DbXB4IikmR2QOHGacf4ADbnOauST1OrwTH3lNBPc',
    fetch: nodeFetch,
});

export default unsplash;