/**
 * @file HamburgerMenu.js
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './HamburgerMenu.module.css'

const HamburgerMenu = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const [active, setActive] = useState(false)

  console.log('active', active)
  return (
    <Tag
      className={`${styles.hamburger_menu} ${
        styles[`hamburger_menu__${variant}`]
      } ${className}`}
    >
      <div
        role="button"
        ariaLabel="Open menu"
        ariaPressed="false"
        tabIndex="0"
        className="hamburger-menu outer-container focus:outline-none focus:shadow-none"
        onClick={() => setActive(!active)}
      >
        <div className="inner-container menu">
          {active ? (
            <>
              <div className="line-0 l0-active"></div>
              <div className="line-1 l1-active"></div>
              <div className="line-3 l2-active"></div>
            </>
          ) : (
            <>
              <div className="line-0 l0-inactive"></div>
              <div className="line-1 l1-inactive"></div>
              <div className="line-3 l2-inactive"></div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .outer-container {
          position: fixed;
          right: 1.3rem;
          top: 1.5rem;
          z-index: 99999;
          cursor: pointer;
          width: 4rem;
          height: 4rem;
          padding: 0.8rem;
        }
        @media (min-width: 768px) {
          .outer-container {
            top: 3rem;
            right: 3rem;
          }
        }

        .cNaOAr {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          -webkit-box-pack: justify;
          justify-content: space-between;
          width: 2.4rem;
          height: 2.4rem;
        }
        .l0-inactive {
          height: 0.3rem;
          width: 2.4rem;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }
        .l0-inactive::before {
          content: '';
          display: block;
          width: 2.4rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l1-inactive {
          position: relative;
          height: 0.3rem;
          width: 2.4rem;
          background: transparent;
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }
        .l1-inactive::before {
          content: '';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l1-inactive::after {
          content: '';
          display: block;
          position: absolute;
          background: rgb(32, 32, 32);
          right: 0px;
          height: 0.3rem;
          width: 1.8rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l2-inactive {
          height: 0.3rem;
          width: 2.4rem;
          align-self: auto;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform-origin: 100% 50%;
        }
        .l2-inactive::before {
          content: '';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          transform-origin: 0% 50%;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l2-inactive::after {
          content: '';
          display: block;
          position: absolute;
          background: rgb(32, 32, 32);
          right: 0px;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        /* Active state */
        .menu {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          -webkit-box-pack: justify;
          justify-content: space-between;
          width: 2.4rem;
          height: 2.4rem;
        }

        .l0-active {
          height: 0.3rem;
          width: 3.4rem;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform: rotate(45deg) translate(-0.1rem, -0.1rem);
          transform-origin: 0% 50%;
        }

        .l0-active::before {
          content: '';
          display: block;
          width: 1.7rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l1-active {
          position: relative;
          height: 0.3rem;
          width: 3.4rem;
          background: transparent;
          transform: rotate(-45deg) translate(-0.8rem, 0.8rem);
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }

        .l1-active::before {
          content: '';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l1-active::after {
          content: '';
          display: block;
          position: absolute;
          background: rgb(32, 32, 32);
          right: 0px;
          height: 0.3rem;
          width: 1.8rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l2-active {
          height: 0.3rem;
          width: 3.4rem;
          align-self: flex-end;
          background: transparent;
          transform: rotate(45deg) translate(0.1rem, 0.1rem);
          transition: transform 0.2s ease 0s;
          transform-origin: 100% 50%;
        }

        .l2-active::before {
          content: '';
          display: block;
          width: 1.3rem;
          height: 0.3rem;
          position: absolute;
          left: 50%;
          top: 0px;
          transform: translate(-0.15rem, 0%);
          transform-origin: 0% 50%;
          border-radius: 0.2rem;
          background: rgb(32, 32, 32);
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l2-active::after {
          content: '';
          display: block;
          position: absolute;
          background: rgb(32, 32, 32);
          right: 0px;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .menu:hover .line-3::before {
          width: 0.3rem;
        }

        .menu:hover .line-0::before,
        .menu:hover .line-1::before,
        .menu:hover .line-1::after,
        .menu:hover .line-3::after {
          width: 1.3rem;
        }

        .cNaOAr:hover .line-0::before,
        .cNaOAr:hover .line-1::before,
        .cNaOAr:hover .line-1::after,
        .cNaOAr:hover .line-3::after {
          width: 1.8rem;
        }

        .cNaOAr:hover .line-3::before {
          width: 0.3rem;
        }
      `}</style>
    </Tag>
  )
}

HamburgerMenu.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

HamburgerMenu.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default HamburgerMenu
