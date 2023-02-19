import { useAppSelector } from "app/hooks";
import ResetPasswordSection from "components/ResetPasswordSection";
import { useTranslation } from "react-i18next";
import Heading from "shared/Heading/Heading";

const MyProfile = () => {
  const { t, i18n } = useTranslation();
  const userData = useAppSelector((state) => state.account.userData);

  return (
    <div>
      <Heading desc="">{t('my-account')}</Heading>
      <div className="bg-white rounded-md shadow-sm mt-3 h-full p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 md:gap-10">
          <div>
            <label className="input-lable  text-gray700">{t('user-name')}</label>
            <p className="my-2 text-xl text-gray600">
              {userData?.username || t('unknown')}
            </p>
          </div>
          <div>
            <label className="input-lable  text-gray700">{t('email')}</label>
            <p className="my-2 text-xl text-gray600">
              {userData?.email || t('unknown')}
            </p>
          </div>
        </div>

        <div className="my-10 border border-gray-200" />

        <ResetPasswordSection />
      </div>
    </div>
  );
};

export default MyProfile;
