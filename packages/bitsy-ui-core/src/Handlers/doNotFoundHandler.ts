import express from 'express';

type doNotFoundHandler = (req: express.Request, res: express.Response) => any;

const doNotFoundHandler: doNotFoundHandler = async (req, res) => {
  res.sendStatus(404);
};

export default doNotFoundHandler;
