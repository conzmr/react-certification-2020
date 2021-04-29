import React from 'react';
import ReactDOM from 'react-dom';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import LoginModal from './LoginModal.component';
import { useGlobalContext } from '../../state/GlobalProvider';
import * as loginApi from './login.api';

ReactDOM.createPortal = jest.fn((modal) => modal);
jest.mock('../../state/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

useGlobalContext.mockImplementation(() => {
  return { state: { authenticated: false, sessionData: {} }, dispatch: jest.fn() };
});

// return Promise.reject(new Error('Username or password invalid'))

describe('Hidden LoginModal', () => {
  it('is not rendered when global state property showLoginModal is false', () => {
    useGlobalContext.mockImplementation(() => {
      return { state: { authenticated: false, sessionData: {} }, dispatch: jest.fn() };
    });
    render(<LoginModal />);
    expect(screen.queryByPlaceholderText('Username')).toBeNull();
    expect(screen.queryByPlaceholderText('Password')).toBeNull();
    expect(screen.queryByText('submit')).toBeNull();
  });
});

describe('Visible LoginModal', () => {
  useGlobalContext.mockImplementation(() => {
    return { state: { showLoginModal: true }, dispatch: jest.fn() };
  });
  it('renders properly initially', () => {
    useGlobalContext.mockImplementationOnce(() => {
      return { state: { showLoginModal: true }, dispatch: jest.fn() };
    });
    render(<LoginModal />);
    expect(screen.queryByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  // it("goes into the error (401) status when submitting the wrong email", async () => {
  //     useGlobalContext.mockImplementationOnce(() => {
  //         return { state: { showLoginModal: true }, dispatch: jest.fn() };
  //      });
  //      render(<LoginModal />);
  //      screen.debug()
  //      const usernameInput = screen.queryByPlaceholderText('Username');
  //     fireEvent.change(usernameInput, { target: { value: 'test' } });
  //     console.log("usernameInput", usernameInput)
  //     screen.debug()
  //     const passwordInput = screen.queryByPlaceholderText('Password');
  //     console.log("passwordInput", passwordInput)
  //     fireEvent.change(passwordInput, { target: { value: 'test' } });

  //     await waitFor(() => {
  //         expect(usernameInput.value).toBe('test')
  //         expect(passwordInput.value).toBe('test')
  //     });
  //     screen.debug()
  //     // console.log("")
  //     // userEvent.type(
  //     // screen.queryByPlaceholderText("Username"),
  //     // "not-pepe@example.com"
  //     // );
  //     // userEvent.type(screen.queryByPlaceholderText("Password"), "12345");
  //     // screen.debug()
  //     // userEvent.click(screen.getByRole("button", { name: /Log in/i }));
  //     // expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  // });

  //   it("goes into the error (401) status when submitting the wrong password", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
  //     userEvent.type(screen.getByLabelText("Password"), "01234");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  //   });
});

describe('LoginForm', () => {
  jest.mock('./login.api', () => jest.fn(() => Promise.resolve()));
  beforeAll(() => {
    useGlobalContext.mockImplementationOnce(() => {
      return { state: { showLoginModal: true }, dispatch: jest.fn() };
    });
  });

  //     it("shows spinner component when submitting the form", async () => {

  //         const promise = Promise.resolve();
  //         loginApi.mockImplementationOnce(() => {

  //         })
  //         const loginApi = jest.fn(() => promise);
  //         render(<LoginForm onSubmit={onSubmitHandler} />);

  //         userEvent.click(screen.getByRole("button", { name: /Log in/ }));
  //         expect(await screen.findByText(/signing-in/i)).toBeInTheDocument();
  //         await act(() => promise);
  //         expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  //         expect(onSubmitHandler).toHaveBeenCalledWith("", "");
  //     });

  //   it('renders containing all its elements: search bar, toggle button and auth menu', () => {
  //     useGlobalContext.mockImplementation(() => {
  //       return { state: { theme: 'ligth' }, dispatch: mockDispatch };
  //     });
  //     const wrapper = shallow(<NavBar />);
  //     expect(wrapper.containsMatchingElement(<Logo />)).toEqual(true);
  //     expect(wrapper.containsMatchingElement(<ToggleButton />)).toEqual(true);
  //     expect(wrapper.containsMatchingElement(<AuthMenu />)).toEqual(true);
  //     expect(wrapper.containsMatchingElement(<SearchBar />)).toEqual(true);
  //   });

  //   it("goes into the error (400) status when submitting the form without email and password", async () => {
  //     render(<LoginModal />);

  //     userEvent.click(screen.getByRole("button", { name: /LOG IN/ }));
  //     expect(loginApi).toHaveBeenCalledTimes(1);
  //     expect(loginApi).toHaveBeenCalledWith("", "");
  //     //expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the error (400) status when submitting the form without email", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(screen.getByLabelText("Password"), "12345");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the error (400) status when submitting the form without password", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the error (401) status when submitting the wrong email", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(
  //       screen.getByLabelText("Email address"),
  //       "not-pepe@example.com"
  //     );
  //     userEvent.type(screen.getByLabelText("Password"), "12345");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the error (401) status when submitting the wrong password", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
  //     userEvent.type(screen.getByLabelText("Password"), "01234");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the error (401) status when submitting the wrong email and password", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(
  //       screen.getByLabelText("Email address"),
  //       "not-pepe@example.com"
  //     );
  //     userEvent.type(screen.getByLabelText("Password"), "01234");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  //   });

  //   it("goes into the success status when submitting the correct email and password", async () => {
  //     render(<LoginForm />);

  //     userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
  //     userEvent.type(screen.getByLabelText("Password"), "12345");
  //     userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
  //     expect(await screen.findByText(/success/i)).toBeInTheDocument();
  //   });
});
