import {
    Box,
    Button, Heading, HStack, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay, Text, useDisclosure,
    Tabs, TabList, TabPanels, Tab, TabPanel, Tag, Flex, Tooltip
} from '@chakra-ui/react'
import React from 'react'

export default function ModalLore({ name, lore, wallpaper, spells, sums, tags, title }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const TagScheme = (tag) => {
        switch (tag) {
            case 'Assassin': return 'red';
            case 'Fighter': return 'orange';
            case 'Mage': return 'teal';
            case 'Tank': return 'green';
            case 'Marksman': return 'blue';
        }
    }

    const ranSums = (tag) => {
        switch (tag) {
            case 'Assassin': return 2;
            case 'Fighter': return 13;
            case 'Mage': return 0;
            case 'Tank': return 3;
            case 'Marksman': return 6;
        }
    }

    return (
        <>
            <Button
                variant='outline'
                colorScheme='yellow'
                onClick={onOpen}
                display='block' mt={4}
                pos='absolute'
                zIndex={999}
            >
                Lore
            </Button>
            <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#171717'>
                    <ModalHeader>{name} ~ {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src={wallpaper}
                            alt='wal'
                            borderRadius={15}
                            mb={5}
                        />
                        <Text
                            textAlign='justify'
                        >
                            {lore}
                        </Text>

                        <Box mt={10}>
                            <Box my={4}>
                                <Heading size='md' my={5}>Roles</Heading>
                                {tags.map((item, key) => (
                                    <Tag key={key} mr={2} colorScheme={TagScheme(item)}>{item}</Tag>
                                ))}
                            </Box>

                            <Box my={4}>
                                <Heading size='md' mb={5}>Abilities</Heading>
                                <Tabs variant='unstyled'>
                                    <TabList>
                                        {spells.map(({ spell }, key) => (
                                            <Tab key={key} _selected={{ transform: 'scale(1.3)' }}>
                                                <Image src={spell} alt='ok' borderRadius={10} />
                                            </Tab>
                                        ))}
                                    </TabList>
                                    <TabPanels>
                                        {spells.map(({ description, name, keyboard }, key) => (
                                            <TabPanel key={key}>
                                                <Heading size='sm' my={2}>{name} ({keyboard})</Heading>
                                                <Text textAlign='justify'>{description}</Text>
                                            </TabPanel>
                                        ))}
                                    </TabPanels>
                                </Tabs>
                            </Box>

                            <Box my={4}>
                                <Heading size='md' mb={2}>Recommanded summoners spells</Heading>
                                <Flex gap={2}>
                                    <Tooltip label={sums[4]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[4]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                    <Tooltip label={sums[2]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[2]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                    <Tooltip label={sums[6]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[6]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                    <Tooltip label={sums[13]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[13]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                </Flex>
                            </Box>

                            <Box my={4}>
                                <Heading size='md'>Recommanded core build</Heading>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

