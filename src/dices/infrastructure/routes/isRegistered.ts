export const isRegistered = async (req) => {
  const { name, password } = req.body;
  const isRegistered = await useCases.postUser({
    name: name,
    password: password
  });
  if (!isRegistered) {
    res.status(201).json(name);
  } else {
    res.status(409).json(name);
  }
};
