<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace My\Form\Model;

use Magento\Ui\DataProvider\AbstractDataProvider;
use My\Form\Model\ResourceModel\Customer\CollectionFactory;

/**
 * Class DataProvider
 * @package My\Form\Model
 */
class DataProvider extends AbstractDataProvider
{
    protected $loadedData;

    /**
     * @param string $name
     * @param string $primaryFieldName
     * @param string $requestFieldName
     * @param CollectionFactory $customerCollectionFactory
     * @param array $meta
     * @param array $data
     */
    public function __construct(
    $name, $primaryFieldName, $requestFieldName, CollectionFactory $customerCollectionFactory, array $meta = [], array $data = []
    )
    {
        $this->collection = $customerCollectionFactory->create();
        parent::__construct($name, $primaryFieldName, $requestFieldName, $meta, $data);
    }

     /**
     * data provider  for customer form on admin side
     * @return array
     */
    public function getData()
    {
        if (isset($this->loadedData)) {
            return $this->loadedData;
        }
        $items = $this->collection->getItems();
        foreach ($items as $member) 
            {
            $this->loadedData[$member->getId()] = $member->getData();
        }
        
        return $this->loadedData;
    }

}
