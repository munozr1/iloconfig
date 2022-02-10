![HPE logo](./hpe_logo/hpe-logo.svg)

#### Not an official HPE product.

# iLO Configuration Tool for HPE servers running iLO 5

## Introduction

iloconfig is a command line interface for managing HPE servers. The following are the current actions you can automate using the iLO configuration tool.

- [x] Create new users
- [x] Change user password
- [x] Turn on/off DHCP
- [ ]Change user privileges
- [ ]Set custome hostname
- [ ]Set custome ip address


## Installation

To install the iLO configuration tool, you need to first clone the repository.

```bash
git clone https://github.com/munozr1/iloconfig.git
```

Then, you need to install the dependencies.

```bash
cd iloconfig
```

```
npm install
```

Next you need to install the iLO configuration tool globally on your system.

```bash
npm install -g
```

## Usage

The iLO configuration tool utilizes CSV files for input. You can view an example CSV file in the repository.

To run the tool you use the 'ilo' command.

```bash
ilo -f <file>
```

where \<file> is the name of the CSV file.
