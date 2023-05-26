import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
const Footer: React.FC = () => {
  const defaultMessage = 'API接口侠';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: '个人博客',
          href: 'http://iamshaonian.top',
          blankTarget: true,
        },
        {
          key: 'beian',
          title: 'Github',
          href: 'https://github.com/shaonianjzh',
          blankTarget: false,
        },
      ]}
    />
  );
};
export default Footer;
