interface ModalMessageRecoverPasswordType {
  email: string;
}
const ModalMessageRecoverPassword = ({
  email,
}: ModalMessageRecoverPasswordType) => {
  return (
    <div className="flex flex-col text-center gap-6 h-fit w-full lg:w-[25.75rem] p-8 rounded shadow bg-gray-100">
      <span className="h-7">Recupere a sua senha</span>
      <p>
        Caso o email {email} exista em nossa base, você receberá o link para
        redefinição de senha!
      </p>
    </div>
  );
};
export default ModalMessageRecoverPassword;
