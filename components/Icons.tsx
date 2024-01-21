export function Plus(props: { size?: number }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C12.5523 3 13 3.44772 13 4V11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H13V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H11V4C11 3.44772 11.4477 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Smiley(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3321 15.0548C17.6384 14.5953 17.5143 13.9744 17.0547 13.6681C16.5952 13.3617 15.9743 13.4859 15.668 13.9454C14.8183 15.2199 13.6573 16.0001 12 16.0001C10.3461 16.0001 9.17154 15.222 8.22661 13.9144C7.90313 13.4668 7.27802 13.3661 6.83038 13.6896C6.38274 14.0131 6.28209 14.6382 6.60557 15.0858C7.82855 16.7782 9.55334 18.0001 12 18.0001C14.4434 18.0001 16.1817 16.7803 17.3321 15.0548Z"
        fill="currentColor"
      />
      <path
        d="M7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5Z"
        fill="currentColor"
      />
      <path
        d="M15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Save(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      className={props.className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C12.5523 3 13 3.44772 13 4V13.0858L16.2929 9.79289C16.6834 9.40237 17.3166 9.40237 17.7071 9.79289C18.0976 10.1834 18.0976 10.8166 17.7071 11.2071L12.7071 16.2071C12.3166 16.5976 11.6834 16.5976 11.2929 16.2071L6.29289 11.2071C5.90237 10.8166 5.90237 10.1834 6.29289 9.79289C6.68342 9.40237 7.31658 9.40237 7.70711 9.79289L11 13.0858V4C11 3.44772 11.4477 3 12 3ZM4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14C3 13.4477 3.44772 13 4 13Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Copy(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8V3ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16V7C16 7.55228 15.5523 8 15 8H9C8.44772 8 8 7.55228 8 7V6ZM14 4H10V6H14V4Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function X(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7071 4.70711C21.0976 4.31658 21.0976 3.68342 20.7071 3.29289C20.3165 2.90237 19.6834 2.90237 19.2928 3.29289L13.4135 9.17225L9.25513 3.41451C9.06712 3.1542 8.76555 3 8.44445 3H4C3.62447 3 3.2806 3.21039 3.10964 3.54475C2.93868 3.8791 2.96946 4.28106 3.18932 4.58549L9.40038 13.1854L3.29289 19.2929C2.90237 19.6834 2.90237 20.3166 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071L10.5865 14.8277L14.7449 20.5855C14.9329 20.8458 15.2345 21 15.5556 21H20C20.3755 21 20.7194 20.7896 20.8904 20.4553C21.0613 20.1209 21.0306 19.7189 20.8107 19.4145L14.5996 10.8146L20.7071 4.70711ZM5.95576 5L16.0669 19H18.0442L7.93314 5H5.95576Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Information(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z"
        fill="currentColor"
      />
      <path
        d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ChevronDown(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7071 10.2929C16.3166 9.90237 15.6834 9.90237 15.2929 10.2929L12 13.5858L8.70711 10.2929C8.31658 9.90237 7.68342 9.90237 7.29289 10.2929C6.90237 10.6834 6.90237 11.3166 7.29289 11.7071L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L16.7071 11.7071C17.0976 11.3166 17.0976 10.6834 16.7071 10.2929Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Mail(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H5ZM4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V7.35007L12.406 10.7252C12.1475 10.8401 11.8523 10.8401 11.5937 10.7252L4 7.35017V7ZM4 9.53881V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V9.53871L13.2183 12.5528C12.4426 12.8975 11.5572 12.8975 10.7815 12.5528L4 9.53881Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ArrowLeft(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7071 4.79289C11.3166 4.40237 10.6834 4.40237 10.2929 4.79289L3.79289 11.2929C3.40237 11.6834 3.40237 12.3166 3.79289 12.7071L10.2929 19.2071C10.6834 19.5976 11.3166 19.5976 11.7071 19.2071C12.0976 18.8166 12.0976 18.1834 11.7071 17.7929L6.91421 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H6.91421L11.7071 6.20711C12.0976 5.81658 12.0976 5.18342 11.7071 4.79289Z"
        fill="black"
      />
    </svg>
  )
}

export function File(props: { size?: number; className?: string }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 7C2 5.34315 3.34315 4 5 4H9.03875C9.9501 4 10.812 4.41427 11.3814 5.12591L12.1804 6.12469C12.3702 6.36191 12.6575 6.5 12.9612 6.5H18C19.6569 6.5 21 7.84315 21 9.5V10.4367C22.0714 11.0918 22.682 12.395 22.3489 13.7276L21.3489 17.7276C21.015 19.0631 19.815 20 18.4384 20H4C2.89543 20 2 19.1046 2 18V7ZM5.28078 18H18.4384C18.8973 18 19.2973 17.6877 19.4086 17.2425L20.4086 13.2425C20.5664 12.6114 20.089 12 19.4384 12H7.56155C7.10268 12 6.7027 12.3123 6.59141 12.7575L5.28078 18ZM4 14.8769V7C4 6.44772 4.44772 6 5 6H9.03875C9.34253 6 9.62985 6.13809 9.81962 6.3753L10.6186 7.37408C11.188 8.08573 12.0499 8.5 12.9612 8.5H18C18.5523 8.5 19 8.94772 19 9.5V10H7.56155C6.18495 10 4.985 10.9369 4.65113 12.2724L4 14.8769Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function RotateLeft(props: { size?: number }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2071 1.79289C14.5976 2.18342 14.5976 2.81658 14.2071 3.20711L13.4142 4H18C19.6569 4 21 5.34315 21 7V12C21 12.5523 20.5523 13 20 13C19.4477 13 19 12.5523 19 12V7C19 6.44772 18.5523 6 18 6H13.4142L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711C13.8166 8.59763 13.1834 8.59763 12.7929 8.20711L10.2929 5.70711C9.90237 5.31658 9.90237 4.68342 10.2929 4.29289L12.7929 1.79289C13.1834 1.40237 13.8166 1.40237 14.2071 1.79289ZM3 13C3 11.3431 4.34315 10 6 10H12C13.6569 10 15 11.3431 15 13V19C15 20.6569 13.6569 22 12 22H6C4.34315 22 3 20.6569 3 19V13ZM6 12C5.44772 12 5 12.4477 5 13V19C5 19.5523 5.44772 20 6 20H12C12.5523 20 13 19.5523 13 19V13C13 12.4477 12.5523 12 12 12H6Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function RotateRight(props: { size?: number }) {
  return (
    <svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.79289 1.79289C10.1834 1.40237 10.8166 1.40237 11.2071 1.79289L13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L11.2071 8.20711C10.8166 8.59763 10.1834 8.59763 9.79289 8.20711C9.40237 7.81658 9.40237 7.18342 9.79289 6.79289L10.5858 6H6C5.44772 6 5 6.44772 5 7V12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12V7C3 5.34315 4.34315 4 6 4H10.5858L9.79289 3.20711C9.40237 2.81658 9.40237 2.18342 9.79289 1.79289ZM9 13C9 11.3431 10.3431 10 12 10H18C19.6569 10 21 11.3431 21 13V19C21 20.6569 19.6569 22 18 22H12C10.3431 22 9 20.6569 9 19V13ZM12 12C11.4477 12 11 12.4477 11 13V19C11 19.5523 11.4477 20 12 20H18C18.5523 20 19 19.5523 19 19V13C19 12.4477 18.5523 12 18 12H12Z"
        fill="currentColor"
      />
    </svg>
  )
}
