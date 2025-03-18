// react
import { useState } from 'react';
// images
import { svgPin, svgMap, svgPhone, svgSearch, svgCompare, svgLiked, svgDelivery } from '../Svgs';
import logo from '../../assets/logo.svg';
// other
import styles from './style.module.scss';
import data from './data.json';

const Header = () => {
  const [openCatalog, setOpenCatalog] = useState(false);
  const [openCatalogItem, setOpenCatalogItem] = useState(0);

  return (
    <header className={styles.header}>
      {/* top */}
      <div className={styles.header__top}>
        {svgPin}
        <p>{data.headerTop}</p>
      </div>
      {/* middle */}
      <div className={styles.container}>
        <div className={styles.header__center}>
          <a href="#" className={styles.header__center__logo}>
            <img src={logo} alt="Logo" />
          </a>
          <div className={styles.header__center__contact}>
            <a href="#" className={styles.header__center__contact__location}>
              {svgMap} <span>{data.location}</span>
            </a>
            <a href={data.phone.url} className={styles.header__center__contact__phone}>
              {svgPhone} <span>{data.phone.title}</span>
            </a>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className={styles.header__bottom}>
        <div className={styles.container}>
          <nav className={styles.menu}>
            <ul className={styles.menu__list}>
              <li>
                <button onClick={() => setOpenCatalog(!openCatalog)}>
                  <div className={styles.menu__list__catalog__burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  {data.catalogTitle}
                </button>
              </li>
              {data.menuList.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>
                    {item.title} {item.svgSearch ? svgSearch : ''}
                  </a>
                </li>
              ))}
            </ul>
            <ul className={styles.menu__favorites__list}>
              {data.favoritesList.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>
                    {item.svgName === 'compare'
                      ? svgCompare
                      : item.svgName === 'delivery'
                      ? svgDelivery
                      : svgLiked}{' '}
                    <span>{item.number}</span>
                  </a>
                </li>
              ))}
            </ul>
            {openCatalog && (
              <div
                className={styles.catalog}
                onMouseLeave={() => setOpenCatalog(false)}
                onMouseDown={() => setOpenCatalog(false)}
              >
                <ul className={styles.catalog__list}>
                  {data.catalogList.map((item) => (
                    <>
                      <li
                        onMouseMove={() => setOpenCatalogItem(item.id)}
                        className={
                          openCatalogItem === item.id
                            ? styles.catalog__list__item__active
                            : styles.catalog__list__item
                        }
                        key={item.id}
                      >
                        {item.title}
                      </li>
                      {openCatalogItem === item.id && (
                        <ul className={styles.catalog__list__item__brands}>
                          {item.catalog.map((item) => (
                            <li key={item.id}>
                              <a href={item.url}>{item.brand}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
