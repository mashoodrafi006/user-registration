export const getAllStaticMethodNames = (givenClass) => {
    const staticMethodNames = Object.getOwnPropertyNames(givenClass).filter((prop) => typeof givenClass[prop] === 'function');

    return staticMethodNames;
};
