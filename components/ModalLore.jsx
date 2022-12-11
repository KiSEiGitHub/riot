import {
    Box,
    Button, Divider, Flex, Heading, HStack, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent,
    ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text, Tooltip, useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function ModalLore({ name, lore, wallpaper, spells, sums, tags, title, ally, enemy, skins }) {

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
                colorScheme='blue.'
                onClick={onOpen}
                display='block' mt={4}
                pos='absolute'
                w='100%'
                h='100%'
                zIndex={999}
            />

            <Modal isOpen={isOpen} size='4xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#171717'>
                    <ModalHeader>{name} ~ {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay,Navigation, Pagination]}
                            className="mySwiper"
                        >
                            {skins.map(({num, name: skinName}, key) => {
                                return (
                                    <>
                                        <SwiperSlide style={{position: 'relative'}}>
                                            <Image
                                                key={key}
                                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${num}.jpg`}
                                                alt='wal'
                                                borderRadius={15}
                                                mb={5}
                                                objectFit='cover'
                                            />
                                            <Text variant='SkinName'>{skinName}</Text>
                                        </SwiperSlide>
                                    </>
                                )
                            })}
                        </Swiper>
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

                            <Divider borderColor='#292929' />

                            <Box my={4}>
                                <Heading size='md' mb={5}>Abilities</Heading>
                                <Tabs variant='unstyled'>
                                    <TabList>
                                        {spells.map(({ image }, key) => (
                                            <Tab key={key} _selected={{ transform: 'scale(1.3)' }}>
                                                <Image src={image} alt='ok' borderRadius={10} />
                                            </Tab>
                                        ))}
                                    </TabList>
                                    <TabPanels>
                                        {spells.map(({ description, name, keyboard }, key) => (
                                            <TabPanel key={key}>
                                                <HStack spacing={2}>
                                                    <Heading size='sm' my={2}>{name}</Heading>
                                                    <Text fontStyle='italic' color='red'>{keyboard}</Text>
                                                </HStack>
                                                <Text textAlign='justify'>{description}</Text>
                                            </TabPanel>
                                        ))}
                                    </TabPanels>
                                </Tabs>
                            </Box>

                            <Divider borderColor='#292929' />

                            <Box my={4}>
                                <Heading size='md' mb={2}>Recommanded summoners spells</Heading>
                                <Flex gap={2}>
                                    <Tooltip label={sums[4]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[4]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                    <Tooltip label={sums[2]['description']} borderRadius={5} bg='#171717' color='#fff' p={2}>
                                        <Image src={sums[2]['img']} alt='ok' w='50px' borderRadius={10} />
                                    </Tooltip>
                                </Flex>
                            </Box>

                            <Divider borderColor='#292929' />

                            <Box my={4}>
                                <Heading size='md'>Tips using {name}</Heading>
                                {ally.map((tips, key) => (
                                    <Box key={key} my={4}>
                                        <Text textAlign='justify'>{tips}</Text>
                                    </Box>
                                ))}
                            </Box>

                            <Divider borderColor='#292929' />

                            <Box my={4}>
                                <Heading size='md'>Tips agains&apos;t {name}</Heading>
                                {enemy.map((tips, key) => (
                                    <Box key={key} my={4}>
                                        <Text textAlign='justify'>{tips}</Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

