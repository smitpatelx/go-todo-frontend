import { Combobox, Transition } from '@headlessui/react';
import {
  mdiCheck,
  mdiUnfoldMoreHorizontal,
} from '@mdi/js';
import { capitalize } from '@smitpatelx/string-utils';
import {
  Fragment, FunctionComponent, useMemo, useState,
} from 'react';
import DIcon from './DIcon';

export type OptionForDMultiDropdown = {
  name: string,
  value: string,
};

type DMultiDropdownProps = {
  options: OptionForDMultiDropdown[],
  onSelect: (data: string[]) => void,
};

const DMultiDropdown: FunctionComponent<DMultiDropdownProps> = ({
  options,
  onSelect,
}: DMultiDropdownProps) => {
  const formattedOptions = useMemo(
    () => options.map((x) => ({ name: capitalize(x.name), value: x.value })),
    [options],
  );
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const filteredoptions = query === ''
    ? formattedOptions
    : formattedOptions.filter((option) => (
      option.value.toLowerCase().includes(query.toLowerCase())
      || option.name.toLowerCase().includes(query.toLowerCase())
    ));

  const emitSelectedOption = (value: string[]) => {
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <Combobox
      onChange={emitSelectedOption}
      value={selectedOption.map((val) => capitalize(val))}
    >
      <div className='relative mt-1'>
        <div className='relative w-full text-left bg-white rounded-md shadow-md cursor-default focus-within:outline-none focus-within:ring focus-within:ring-sky-500 focus-within:ring-offset-sky-100 focus-within:ring-offset-2 sm:text-sm overflow-hidden'>
          <Combobox.Input
            autoComplete='off'
            className='w-full border-none focus:ring-0 rounded-md px-5 py-2.5 font-semibold text-sky-800 placeholder-slate-500'
            displayValue={(option: string) => option}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search your option'
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <DIcon className='w-5 h-5 text-gray-400' icon={mdiUnfoldMoreHorizontal} />
          </Combobox.Button>
        </div>
        <Transition
          afterLeave={() => setQuery('')}
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Combobox.Options className='select-none absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredoptions.length === 0 && query !== '' ? (
              <div className='cursor-default select-none relative py-2 px-4 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              filteredoptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ active }) => `cursor-default select-none relative py-2 pl-10 pr-4 ${
                    active ? 'text-white bg-sky-800' : 'text-sky-800'
                  }`}
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {capitalize(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 
                            ${active ? 'text-white' : 'text-sky-800'}`}
                        >
                          <DIcon className='w-5 h-5' icon={mdiCheck} />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default DMultiDropdown;
