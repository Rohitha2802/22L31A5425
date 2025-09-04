export default async function log(stack, level, pkg, message, authToken) {
  const response = await fetch("http://28.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${authToken},
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Log API request failed");
  }

  return response.json();
}