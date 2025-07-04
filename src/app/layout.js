import "./globals.css";

export const metadata = {
  title: "Painel de controle de Usuários",
  description:
    "Essa página é um desafio técnico realizado no processo seletivo da Sync360, onde foi solicitado a construção de um painel de usuários.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
