export const sendConnection = async (id) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(`${BACKEND_URL}/connection/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ receiverId: id }),
  });
  return { ok: res.ok, status: res.status, data: await res.json() };
};
